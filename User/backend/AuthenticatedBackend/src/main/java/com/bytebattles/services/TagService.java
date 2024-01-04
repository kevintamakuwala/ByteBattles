package com.bytebattles.services;

import com.bytebattles.models.Tag;

import java.util.List;
public interface TagService {

    public List<Tag> getTags();
    public Tag getTagById(String tagId);
    public Tag addTag(Tag tag);
    public Tag updateTag(Tag tag);
    public boolean deleteTag(String tagId);
}
