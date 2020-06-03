import { DynamicBuilderService } from '../dynamic/dynamic-builder.service';
import { ServerPluginsService, ServerPlugin } from './server-plugins.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-server-plugins',
  templateUrl: './server-plugins.component.html',
  styleUrls: ['./server-plugins.component.css']
})
export class ServerPluginsComponent implements OnInit {

  plugins: ServerPlugin[];
  pluginDetail: string;

  installPlugin(plugin: ServerPlugin) {
    this.pluginService.installPlugin(plugin).subscribe(response => {
      if (response.succeeded) {
        this.snackBar.open('Installed plugin', 'Close', {duration: 4000});
        this.refreshPluginList();
      } else {
        this.snackBar.open('Failed to install plugin: ' + response.code + ': ' + response.message, 'Close', {duration: 4000});
      }
    }, error => {
      console.error('failed to install plugin: ', error.message);
    });
  }

  uninstallPlugin(plugin: ServerPlugin) {
    this.pluginService.uninstallPlugin(plugin).subscribe(response => {
      if (response.succeeded) {
        this.snackBar.open('Uninstalled plugin', 'Close', {duration: 4000});
        this.refreshPluginList();
      } else {
        this.snackBar.open('Failed to uninstall plugin: ' + response.code + ': ' + response.message, 'Close', {duration: 4000});
      }
    }, error => {
      console.error('failed to uninstall plugin: ', error.message);
    });
  }

  refreshPluginList() {
    this.pluginService.getPlugins().subscribe(pluginHash => {
      this.plugins = Object.keys(pluginHash).map(key => {
        return pluginHash[key];
      });
    }, error => {
      console.log('failed to retrieve plugins');
    });
  }

  renderPlugin(id: string) {
	this.pluginService.renderPlugin(id).subscribe(data => {
		this.pluginDetail = data;
	});
  }

  constructor(
    private route: ActivatedRoute,
    private pluginService: ServerPluginsService,
    private snackBar: MatSnackBar) {
    this.refreshPluginList();
  }

  ngOnInit() {
	this.route.params.subscribe( params => this.renderPlugin(params['id']) );
  }

}
