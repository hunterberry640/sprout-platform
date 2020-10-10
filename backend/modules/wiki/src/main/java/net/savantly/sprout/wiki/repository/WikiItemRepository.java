package net.savantly.sprout.wiki.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import net.savantly.sprout.wiki.WikiItem;
import net.savantly.sprout.wiki.WikiItemNoContent;

@Repository
@RepositoryRestResource(path="sprout-wiki")
public interface WikiItemRepository extends PagingAndSortingRepository<WikiItem, String>{

	@Query("SELECT w FROM WikiItem w")
	public Page<WikiItemNoContent> allWithNoContent(Pageable page);
}
