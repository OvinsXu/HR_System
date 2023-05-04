package cn.edu.zqu.hr_system.project.base;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public abstract class BaseEntity {
    @TableId(type = IdType.AUTO)
    @ExcelIgnore
    Long id; //编号
    @ExcelIgnore
    @TableField(fill = FieldFill.INSERT)
    Long createBy; // 创建者
    @ExcelIgnore
    @TableField(fill = FieldFill.INSERT)
    LocalDateTime createTime; // 创建时间
    @ExcelIgnore
    @TableField(fill = FieldFill.INSERT_UPDATE)
    Long updateBy; // 更改者
    @ExcelIgnore
    @TableField(fill = FieldFill.INSERT_UPDATE)
    LocalDateTime updateTime; // 更改时间
}
