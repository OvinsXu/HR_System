package cn.edu.zqu.hr_system.project.service.Impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import cn.edu.zqu.hr_system.project.service.FileService;

@Service
public class FileServiceImpl implements FileService {

    private final ResourceLoader resourceLoader;

    public FileServiceImpl(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void generateDocument(String name, String card, String post,LocalDate startDate,
            LocalDate endDate, HttpServletResponse response) {

        try (InputStream templateStream = resourceLoader.getResource("classpath:template/work_cert_template.docx")
                .getInputStream();
                XWPFDocument document = new XWPFDocument(templateStream)) {
            // 替换姓名
            replaceText(document, "name", name);
            // 替换身份证
            replaceText(document, "card", card);
            // 替换岗位
            replaceText(document, "post", post);
            // 替换日期
            replaceText(document, "startDate", startDate.format(DateTimeFormatter.ofPattern("yyyy年M月d日")));
            replaceText(document, "endDate", endDate.format(DateTimeFormatter.ofPattern("yyyy年M月d日")));
            replaceText(document, "nowDate", LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy年M月d日")));
            // 生成文件
            String fileName = name + "的工作证明.docx";
            File file = new File(fileName);
            try (OutputStream os = new FileOutputStream(file)) {
                document.write(os);
            }
            // 设置 HTTP 响应头
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment;filename=" + file.getName());

            // 将文件写入响应流
            try (FileInputStream fis = new FileInputStream(file)) {
                byte[] buffer = new byte[1024];
                int len;
                while ((len = fis.read(buffer)) != -1) {
                    response.getOutputStream().write(buffer, 0, len);
                }
                response.getOutputStream().flush();
            }
        } catch (IOException e) {
            throw new RuntimeException("Unable to generate document", e);
        }
    }



    /**
     * 替换 Word 文档中的文本
     *
     * @param document Word 文档对象
     * @param oldText  需要替换的文本
     * @param newText  替换后的文本
     */
    private void replaceText(XWPFDocument document, String oldText, String newText) {
        for (XWPFParagraph paragraph : document.getParagraphs()) {
            for (XWPFRun run : paragraph.getRuns()) {
                String text = run.getText(0);
                if (text != null && text.contains(oldText)) {
                    text = text.replace(oldText, newText);
                    run.setText(text, 0);
                }
            }
        }
    }
}
