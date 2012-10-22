<div id="text">
	<div id="text-toolbar">
		<table align="left" cellpadding="2" cellspacing="2" border="0">
			<tr valign="top">
				<td align="center">
					<a id="text-link-save" href="#save">Сохранить</a>
				</td>
				<td align="center">
					<a id="text-link-preview" href="http://oz.st-n.ru/publish/" target="_blank">Предпросмотр</a>
				</td>
				<td align="center">
					<div id="status"></div>
				</td>
			</tr>
		</table>
	</div>
	<div id="text-table">
		<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
			<tr valign="top">
				<td width="200px">
					<div id="text-menu">
					{if isset($links)}
						{foreach from=$links item=key}
							<a class="text-links-menu" data-file="{$key.file}" href="#text-{$key.name}">{$key.name}</a>
						{/foreach}
					{/if}
					</div>
				</td>
				<td>
					<div id="text-wrap" autofocus wrap="soft" tabindex="0" accesskey="h">
						<textarea id="text-area" width="100%">lorem ipsum dolor</textarea>
					</div>
				</td>
			</tr>
		</table>
	</div>	
</div>
