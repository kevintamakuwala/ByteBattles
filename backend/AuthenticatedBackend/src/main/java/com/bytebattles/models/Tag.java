package com.bytebattles.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tags")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    @JsonProperty("tagId")
    private Long tagId;

    @Column(name = "tag_name",unique = true,length = Integer.MAX_VALUE)
    @JsonProperty("name")
    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "tagList")
    private Set<Problem> problemSet = new HashSet<>();

    public Tag() {
    }

    public Tag(Long tagId, String name, Set<Problem> problemSet) {
        this.tagId = tagId;
        this.name = name;
        if (problemSet != null)
            this.problemSet = problemSet;
    }

    public Set<Problem> getProblemSet() {
        return problemSet;
    }

    public void setProblemSet(Set<Problem> problemSet) {
        this.problemSet = problemSet;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagID) {
        this.tagId = tagID;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "tagId=" + tagId +
                ", name='" + name + '\'' +
                ", problemSet=" + problemSet +
                '}';
    }
}
