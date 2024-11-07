package com.easyacademics.learningtool.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
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
    @JsonIgnore
    private String password;
    private List<String> role;
    private List<String> requests = new ArrayList<>();
    private List<String > friends = new ArrayList<>();
    @JsonIgnore
    private List<Notes> notes = new ArrayList<>();
    @JsonIgnore
    private List<String> groups = new ArrayList<>();

}
