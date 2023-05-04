package cn.edu.zqu.hr_system.project.utils;
//这个工具用于计算个税
public class TaxCalUtil {
    private static final double[] LEVELS = {0, 36000, 144000, 300000, 420000, 660000, 960000};
    private static final double[] RATES = {0.03, 0.1, 0.2, 0.25, 0.3, 0.35, 0.45};
    private static final double[] DEDUCTIONS = {0, 2520, 16920, 31920, 52920, 85920, 181920};

    public static double calculateTax(double income) {
        double taxableIncome = income - 5000; // 免征额为 5000 元
        double totalTax = 0;
        for (int i = LEVELS.length - 1; i >= 0; i--) {
            if (taxableIncome > LEVELS[i]) {
                double incomeInLevel = taxableIncome - LEVELS[i];
                double rate = RATES[i];
                double deduction = DEDUCTIONS[i];
                double taxInLevel = incomeInLevel * rate - deduction;
                if (taxInLevel > 0) {
                    totalTax += taxInLevel;
                }
                taxableIncome -= incomeInLevel; // 继续计算下一级税率
            }
        }
        return totalTax;
    } 
}
