package com.easyacademics.learningtool.repository;

import com.easyacademics.learningtool.models.Schedule;
import com.easyacademics.learningtool.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ScheduleRepository extends MongoRepository<Schedule , String> {
    List<Schedule> findByUser(User user);
}
