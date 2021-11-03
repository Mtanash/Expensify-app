import React from "react";
import { connect } from "react-redux";
import expensesTotal from "../selectors/expenses-total";
import selectVisibleExpenses from "../selectors/expenses";

export const ExpensesSummary = (props) => {
  return (
    <div>
      <p>
        Viewing {props.expensesCount} expenses totalling {props.expenseTotal}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenseTotal: expensesTotal(state.expenses),
    expensesCount: selectVisibleExpenses(state.expenses, state.filters).length,
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
