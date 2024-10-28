package com.easyacademics.learningtool.repository;

import com.easyacademics.learningtool.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User,String > {
    User findByUsername(String username);

}
