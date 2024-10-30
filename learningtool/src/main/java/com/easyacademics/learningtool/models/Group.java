package com.easyacademics.learningtool.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document(collection = "group")
public class Group {
    @Id
    private String id;

    private String name;
    private List<String > membersId;
    private String admin;
}
