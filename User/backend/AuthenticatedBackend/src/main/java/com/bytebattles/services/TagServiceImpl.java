package com.bytebattles.services;

import com.bytebattles.models.Tag;
import com.bytebattles.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService{

    List<Tag> problems;
    @Autowired
    TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAll();
    }

    @Override
    public Tag getTagById(String tagId) {
        return tagRepository.getOne(Long.parseLong(tagId));
    }

    @Override
    public Tag addTag(Tag tag) {
        tagRepository.save(tag);
        return tag;
    }

    @Override
    public Tag updateTag(Tag tag) {
        System.out.println(tag);
        Long tagId = tag.getTagId();
        if (!tagRepository.existsById(tagId)) {
            return null;
        }

        Tag existingTag = tagRepository.getOne(tagId);

        existingTag.setName(tag.getName());

        tagRepository.save(existingTag);

        return existingTag;
    }

    @Override
    public boolean deleteTag(String tagId) {
        tagRepository.deleteById(Long.parseLong(tagId));
        return true;
    }
}



// TagServiceImpl