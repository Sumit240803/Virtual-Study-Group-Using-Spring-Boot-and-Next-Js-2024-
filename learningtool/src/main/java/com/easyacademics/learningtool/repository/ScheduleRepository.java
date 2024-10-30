package com.easyacademics.learningtool.repository;

import com.easyacademics.learningtool.models.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ScheduleRepository extends MongoRepository<Schedule , String> {
    List<Schedule> findByUserId(String userId);
}
