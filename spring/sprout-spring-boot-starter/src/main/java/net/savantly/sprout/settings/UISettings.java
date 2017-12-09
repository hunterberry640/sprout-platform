package net.savantly.sprout.settings;

import org.springframework.stereotype.Service;

@Service
public class UISettings {
	
	private AppSettingRepository settings;

	public UISettings(AppSettingRepository settings) {
		this.settings = settings;
	}
	
	public AppSetting save(AppSetting setting) {
		return settings.save(setting);
	}
	public Iterable<AppSetting> save(Iterable<AppSetting> setting) {
		return settings.save(setting);
	}

	public AppSetting getKeywords() {
		return settings.findOne(SettingName.KEYWORDS.toString());
	}
	public AppSetting getSiteDescription() {
		return settings.findOne(SettingName.SITE_DESCRIPTION.toString());
	}
	public AppSetting getSiteUrl() {
		return settings.findOne(SettingName.SITE_URL.toString());
	}
	public AppSetting getPreviewImage() {
		return settings.findOne(SettingName.PREVIEW_IMAGE.toString());
	}
	public AppSetting getSiteTitle() {
		return settings.findOne(SettingName.SITE_TITLE.toString());
	}
	public AppSetting getSiteBanner() {
		return settings.findOne(SettingName.SITE_BANNER.toString());
	}
	public AppSetting getShowBanner() {
		return settings.findOne(SettingName.SHOW_BANNER.toString());
	}
	public AppSetting getSiteName() {
		return settings.findOne(SettingName.SITE_NAME.toString());
	}
	
}
