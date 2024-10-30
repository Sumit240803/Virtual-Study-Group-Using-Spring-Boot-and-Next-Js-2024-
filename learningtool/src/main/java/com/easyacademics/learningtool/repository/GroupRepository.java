package com.easyacademics.learningtool.repository;

import com.easyacademics.learningtool.models.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends MongoRepository<Group,String> {
}
