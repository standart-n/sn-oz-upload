<div id="files">
	<div id="files-toolbar">
		<table align="left" cellpadding="2" cellspacing="2" border="0">
			<tr valign="top">
				<td width="200px" align="center">
					<!--<a id="files-link-upload" href="#uploadFile">Загрузить</a>-->
					<input id="file_upload" name="file_upload" type="file" multiple="true">
				</td>
				<td align="center">
					<a id="files-link-preview" href="http://oz.st-n.ru/{$publish}/" target="_blank">Предпросмотр</a>
				</td>
				<td align="center">
					<div id="status"></div>
				</td>
			</tr>
		</table>
	</div>
	<div id="files-table">
		<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
			<tr valign="top">
				<td width="200px">
					<div id="files-menu">
					{if isset($links)}
						{foreach from=$links item=key}
							<a 
								id="files-menu-{$key.name}" 
								class="files-links-menu files-links-menu-normal"
								data-folder="{$key.folder}"
								href="#files-{$key.name}"
							>
								{$key.caption}
							</a>
						{/foreach}
					{/if}
					</div>
				</td>
				<td>
					<div id="files-wrap">
						<div id="files-queue"></div>
					</div>
				</td>
			</tr>
		</table>
	</div>	
</div>
