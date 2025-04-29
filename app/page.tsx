"use client";

import React, { useState } from "react";
import TransactionInput from "./components/TransactionInput";
import BulkTransactionInput from "./components/BulkTransactionInput";
import TransactionList from "./components/TransactionList";
import { Transaction, TaxCalculation } from "./types";
import { calculateTax } from "./utils/taxCalculator";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleAddTransactions = (newTransactions: Transaction[]) => {
    setTransactions((prev) => [...prev, ...newTransactions]);
  };

  const handleCalculateTax = async () => {
    if (transactions.length === 0) {
      setError("Dodaj przynajmniej jedną transakcję");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await calculateTax(transactions);

      if (!result) {
        throw new Error("Nie udało się obliczyć podatku");
      }

      setTaxCalculation(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił błąd podczas obliczania podatku"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setTransactions([]);
    setTaxCalculation(null);
    setError(null);
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="container" style={{maxWidth: '1200px'}}>
        <header className="text-center mb-8">
          <h1 className="title-main">
            Kalkulator podatku od transakcji walutowych
          </h1>
          <p className="text-secondary mt-2">
            Oblicz podatek 19% od transakcji w walutach obcych na podstawie kursów NBP
          </p>
        </header>
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 mb-6">
          <div>
            <div className="card mb-6">
              <div className="flex border-b border-none">
                <button
                  className={`flex-1 py-3 text-center font-medium btn-tab ${activeTab === "single" ? "btn-primary" : ""}`}
                  onClick={() => setActiveTab("single")}
                >
                  Pojedyncza transakcja
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium btn-tab ${activeTab === "bulk" ? "btn-primary" : ""}`}
                  onClick={() => setActiveTab("bulk")}
                >
                  Wiele transakcji
                </button>
              </div>
              {activeTab === "single" ? (
                <TransactionInput onAddTransaction={handleAddTransaction} />
              ) : (
                <BulkTransactionInput onAddTransactions={handleAddTransactions} />
              )}
            </div>
            {transactions.length > 0 && (
              <div className="card">
                <h2 className="card-title">
                  Transakcje ({transactions.length})
                </h2>
                <div className="max-h-60 overflow-y-auto mb-4">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th>Waluta</th>
                        <th>Kwota</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((t, index) => (
                        <tr key={index}>
                          <td className="font-medium">{t.currency}</td>
                          <td>{Number(t.amount).toFixed(2)}</td>
                          <td>{t.data}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex space-x-3">
                  <button
                    className="flex-1 btn btn-primary"
                    onClick={handleCalculateTax}
                    disabled={isLoading}
                  >
                    {isLoading ? "Obliczanie..." : "Oblicz podatek"}
                  </button>
                  <button
                    className="flex-1 btn btn-danger"
                    onClick={handleClearAll}
                  >
                    Wyczyść
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <TransactionList
              taxCalculation={taxCalculation}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        <footer className="text-center text-secondary text-sm mt-12">
          <p>
            Dane kursów walut pobierane z oficjalnego API Narodowego Banku Polskiego.
          </p>
          <p className="mt-1">
            Aplikacja służy jedynie do celów informacyjnych i nie stanowi porady podatkowej.
          </p>
        </footer>
      </div>
    </main>
  );
}
