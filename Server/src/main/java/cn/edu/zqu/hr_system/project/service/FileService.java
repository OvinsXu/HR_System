package cn.edu.zqu.hr_system.project.service;

import java.time.LocalDate;

import javax.servlet.http.HttpServletResponse;

public interface FileService {
    
    void generateDocument(String name,  String card, String post, LocalDate startDate, LocalDate endDate,HttpServletResponse response);
    
}
