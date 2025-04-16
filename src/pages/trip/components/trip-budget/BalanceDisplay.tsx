import React from 'react';

interface User {
  id: string;
  name: string;
}

interface BalanceDisplayProps {
  users: User[];
  balances: Record<string, number>;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ users, balances }) => {
  const getUserName = (userId: string): string => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Sconosciuto';
  };

  // Create settlements (who should pay whom)
  const calculateSettlements = () => {
    // Deep copy of balances
    const settleBalances = { ...balances };
    const settlements = [];

    // Separate creditors and debtors
    const creditors = Object.keys(settleBalances)
      .filter((id) => settleBalances[id] > 0)
      .sort((a, b) => settleBalances[b] - settleBalances[a]);

    const debtors = Object.keys(settleBalances)
      .filter((id) => settleBalances[id] < 0)
      .sort((a, b) => settleBalances[a] - settleBalances[b]);

    // Match debtors with creditors
    while (debtors.length > 0 && creditors.length > 0) {
      const creditor = creditors[0];
      const debtor = debtors[0];

      const creditAmount = settleBalances[creditor];
      const debtAmount = -settleBalances[debtor];

      const settlementAmount = Math.min(creditAmount, debtAmount);

      if (settlementAmount > 0.01) {
        settlements.push({
          from: debtor,
          to: creditor,
          amount: settlementAmount,
        });
      }

      // Update balances
      settleBalances[creditor] -= settlementAmount;
      settleBalances[debtor] += settlementAmount;

      // Remove settled users
      if (Math.abs(settleBalances[creditor]) < 0.01) {
        creditors.shift();
      }

      if (Math.abs(settleBalances[debtor]) < 0.01) {
        debtors.shift();
      }
    }

    return settlements;
  };

  const settlements = calculateSettlements();

  return (
    <div className='balance-container'>
      <h2>Bilancio</h2>

      <div className='individual-balances'>
        <h3>Bilanci individuali</h3>
        <ul>
          {Object.entries(balances).map(([userId, balance]) => (
            <li
              key={userId}
              className={
                balance > 0 ? 'positive' : balance < 0 ? 'negative' : 'neutral'
              }
            >
              <span>{getUserName(userId)}: </span>
              <span className='amount'>
                {balance > 0 ? '+' : ''}
                {balance.toFixed(2)} €
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className='settlements'>
        <h3>Come regolare i conti</h3>
        {settlements.length === 0 ? (
          <p>Tutti i conti sono in pari!</p>
        ) : (
          <ul>
            {settlements.map((settlement, index) => (
              <li key={index}>
                <strong>{getUserName(settlement.from)}</strong> deve pagare{' '}
                <strong>{getUserName(settlement.to)}</strong>:{' '}
                {settlement.amount.toFixed(2)} €
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BalanceDisplay;
