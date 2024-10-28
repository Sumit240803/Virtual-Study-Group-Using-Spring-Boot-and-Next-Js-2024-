package com.easyacademics.learningtool.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@Data
@Document(collection = "user")
public class User {
    @Id
    private String id;
    private String name;
    private String username;
    private String email;
    private String password;
    private List<String> role;
    @DBRef
    private List<User> requests = new ArrayList<>();
    @DBRef
    private List<User> friends = new ArrayList<>();

    @DBRef
    private Notes notes;
    @DBRef
    private Group group;
    @DBRef
    private Schedule schedule;
}
