package com.easyacademics.learningtool.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "notes")
public class Notes {

    @Id
    private String id;

    private String subject;
    private String notes;
    private String userId;

}
