package com.easyacademics.learningtool.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Getter
@Setter
@Document(collection = "schedule")
public class Schedule {
    @Id
    private String id;

    private String name;
    private String note;
    private Date start;
    private Date end;

    @DBRef
    private User user;
}
