package com.easyacademics.learningtool.repository;

import com.easyacademics.learningtool.models.Messages;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Messages,String> {
}
