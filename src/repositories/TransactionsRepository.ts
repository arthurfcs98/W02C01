import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (!this.transactions) {
      const balance: Balance = {
        income: 0,
        outcome: 0,
        total: 0,
      };
      return balance;
    }

    const income = this.transactions.reduce(
      (accumulateIncome, currentTransaction): number => {
        if (currentTransaction.type === 'outcome') {
          return accumulateIncome;
        }
        return accumulateIncome + currentTransaction.value;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (accumulateOutcome, currentTransaction): number => {
        if (currentTransaction.type === 'income') {
          return accumulateOutcome;
        }
        return accumulateOutcome + currentTransaction.value;
      },
      0,
    );

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionTDO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
