package com.bytebattles.services;

import com.bytebattles.models.Contest;
import com.bytebattles.models.Problem;
import com.bytebattles.models.Tag;
import com.bytebattles.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagServiceImpl implements TagService {

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
        Optional<Tag> existingTag = tagRepository.findByName(tag.getName());
        return existingTag.orElseGet(() -> tagRepository.save(tag));
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

        Tag tag = tagRepository.findById(Long.parseLong(tagId)).get();

        for (Problem problem : tag.getProblemSet()) {
            problem.getTagList().remove(tag);
        }
        tag.getProblemSet().clear();
        tagRepository.delete(tag);
        return true;
    }
}
