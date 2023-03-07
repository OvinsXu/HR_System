package cn.edu.zqu.hr_system.project.mapper;

import cn.edu.zqu.hr_system.project.model.entities.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UserMapper extends BaseMapper<User> {
}
