import React from "react";
import { ProcessedTransaction, TaxCalculation } from "../types";

interface TransactionListProps {
  taxCalculation: TaxCalculation | null;
  isLoading: boolean;
  error: string | null;
}

export default function TransactionList({
  taxCalculation,
  isLoading,
  error,
}: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          <p className="ml-3 text-secondary">Pobieranie kursów walut...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!taxCalculation || taxCalculation.transactions.length === 0) {
    return (
      <div className="card">
        <p className="text-secondary text-center py-8">
          Brak transakcji do wyświetlenia
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(amount);
  };

  // Sprawdzamy czy są daty z przyszłości
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const hasFutureDates = taxCalculation.transactions.some((transaction) => {
    const [day, month, year] = transaction.data.split("-");
    const transactionDate = new Date(`${year}-${month}-${day}`);
    return transactionDate > currentDate;
  });

  return (
    <div className="card">
      <h2 className="card-title">
        Podsumowanie transakcji
      </h2>

      {hasFutureDates && (
        <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4 text-sm">
          <p>
            <strong>Uwaga:</strong> Niektóre transakcje mają daty z przyszłości.
          </p>
          <p>Dla tych transakcji użyto aktualnych kursów walut z NBP.</p>
        </div>
      )}

      <div style={{overflowX: 'auto', maxWidth: '100%'}}>
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Waluta</th>
              <th>Kwota</th>
              <th>Data</th>
              <th>Kurs</th>
              <th>Wartość PLN</th>
            </tr>
          </thead>
          <tbody>
            {taxCalculation.transactions.map((transaction: ProcessedTransaction, index: number) => {
              const [day, month, year] = transaction.data.split("-");
              const transactionDate = new Date(`${year}-${month}-${day}`);
              const isFuture = transactionDate > currentDate;
              return (
                <tr key={index}>
                  <td className="font-medium">{transaction.currency}</td>
                  <td>{transaction.amount.toFixed(2)}</td>
                  <td className={isFuture ? "text-yellow-600" : ""}>
                    {transaction.data}
                    {isFuture && <span className="ml-1 text-xs">⚠️</span>}
                  </td>
                  <td>{transaction.exchangeRate.toFixed(4)}</td>
                  <td className="font-medium">{transaction.amountPLN.toFixed(2)} PLN</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-4 border-t border-none">
        <div className="flex justify-between items-center py-2">
          <span className="font-medium text-secondary">Suma w PLN:</span>
          <span className="font-medium">
            {formatCurrency(taxCalculation.totalAmountPLN)}
          </span>
        </div>
        <hr style={{border: 'none', borderTop: '1.5px solid #232347', margin: '0.2rem 0 0.5rem 0'}} />
        <div className="flex justify-between items-center py-2">
          <span className="font-medium text-secondary">Stawka podatku:</span>
          <span className="font-medium">
            {(taxCalculation.taxRate * 100).toFixed(0)}%
          </span>
        </div>
        <hr style={{border: 'none', borderTop: '1.5px solid #232347', margin: '0.2rem 0 0.5rem 0'}} />
        <div className="py-3 mt-2 flex justify-between items-center" style={{background: 'rgba(139,92,246,0.10)', borderRadius: '1rem', padding: '0 1.2rem'}}>
          <span className="font-bold" style={{color: '#A78BFA', fontSize: '1.1rem'}}>Podatek do zapłaty:</span>
          <span className="font-bold text-xl" style={{color: '#A78BFA', fontSize: '1.35rem'}}>
            {formatCurrency(taxCalculation.taxAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
