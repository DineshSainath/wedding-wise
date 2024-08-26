const Budget = require("../models/Budget");
class BudgetService {

    static createBudget = async (eventId,totalBudget) => {

        try {
            let budget = await Budget.findOne({ event: eventId });
      
            if (budget) {
              // Update existing budget
              budget.totalBudget = totalBudget;
            } else {
              // Create new budget
              budget = new Budget({
                event: eventId,
                totalBudget,
              });
            }
      
            await budget.save();
            return budget;
          } catch (err) {
            console.error(err.message);
            return null;
          }
    }
}

module.exports = BudgetService