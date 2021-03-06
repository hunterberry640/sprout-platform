package net.savantly.sprout.module.newsfeed;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import lombok.Data;
import net.savantly.sprout.core.module.SproutModuleConfiguration;

/**
 * 
 * An example of how the 'application.properties' values can be injected at runtime into other beans
 *
 */
@Data
@SproutModuleConfiguration
@ConfigurationProperties("plugins.newsfeed")
@EntityScan
@EnableJpaRepositories
public class NewsfeedModuleConfiguration {
	


}
