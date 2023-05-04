package cn.edu.zqu.hr_system.project.controller;
import java.time.LocalDate;

import javax.servlet.http.HttpServletResponse;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cn.edu.zqu.hr_system.project.service.FileService;

@Controller
@RequestMapping("/file")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/certificate")
    public void downloadCertificate(HttpServletResponse response,@RequestParam("name") String name,
                                                                                     @RequestParam("card")  String card, @RequestParam("post") String post,
                                                                                     @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                                     @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        fileService.generateDocument(name, card,post, startDate, endDate,response);
    }
}
