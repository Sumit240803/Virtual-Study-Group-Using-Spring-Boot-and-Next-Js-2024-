package com.easyacademics.learningtool.configurations;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.concurrent.TimeUnit;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient(){
        String uri = "mongodb://localhost:27017/";
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .applyToConnectionPoolSettings(builder ->
                        builder.maxConnectionIdleTime(1000, TimeUnit.MILLISECONDS))
                .build();
        return MongoClients.create(settings);
    }
    @Bean
    public MongoTemplate mongoTemplate(){
        return new MongoTemplate(mongoClient(),"EasyAcademics");
    }
    }
