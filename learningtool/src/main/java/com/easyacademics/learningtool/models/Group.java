package com.easyacademics.learningtool.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Getter
@Setter
@Document(collation = "group")
public class Group {
    @Id
    private String id;
    private String name;
    //private List<User> members;
  //  private User admin;
}
