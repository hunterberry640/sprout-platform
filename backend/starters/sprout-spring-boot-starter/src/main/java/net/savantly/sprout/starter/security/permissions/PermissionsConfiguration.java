package net.savantly.sprout.starter.security.permissions;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.savantly.authorization.service.PermissionProvider;
import net.savantly.sprout.autoconfigure.properties.SproutConfigurationProperties;
import net.savantly.sprout.core.domain.privilege.PrivilegeRepository;
import net.savantly.sprout.core.domain.role.RoleRepository;

@Configuration
public class PermissionsConfiguration {

	@Bean
	@ConditionalOnMissingBean(PermissionProvider.class)
	public PermissionProvider permissionProvider(RoleRepository roleRepository) {
		return new DefaultPermissionProvider(roleRepository);
	}

	@Bean
	public PermissionsFixture permissionsFixture(RoleRepository roleRepo, PrivilegeRepository privilegeRepo,
			SproutConfigurationProperties configProps) {
		return new PermissionsFixture(roleRepo, privilegeRepo, configProps);
	}
}
