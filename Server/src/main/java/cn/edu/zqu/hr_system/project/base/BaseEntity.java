package cn.edu.zqu.hr_system.project.base;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.sql.Date;

@Data
public abstract class BaseEntity {
    @TableId(type = IdType.AUTO)
    Long id; //
    @TableField(fill = FieldFill.INSERT)
    long createBy; // 创建者
    @TableField(fill = FieldFill.INSERT)
    Date createTime; // 创建时间

    @TableField(fill = FieldFill.INSERT_UPDATE)
    long updateBy; // 更改者
    @TableField(fill = FieldFill.INSERT_UPDATE)
    Date updateTime; // 更改时间
}
