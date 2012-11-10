<div id="text">
	<div id="text-toolbar">
		<table align="left" cellpadding="2" cellspacing="2" border="0">
			<tr valign="top">
				<td align="center">
					<a id="text-link-save" href="#saveText">Сохранить</a>
				</td>
				<td align="center">
					<a id="text-link-preview" href="http://oz.st-n.ru/{$publish}/" target="_blank">Предпросмотр</a>
				</td>
				<td align="center">
					<div id="status"></div>
				</td>
				<td>
					<div id="text-tools">
							<table align="right" cellpadding="1" cellspacing="1" border="0">
								<tr>
									<td>
										<div id="text-tools-find-caption" class="text-tools-caption">
											искать:
										</div>
									</td>
									<td>
										<div id="text-tools-find-input" class="text-tools-input">
											<input maxlength="20" size="10" type="text" value="{$nowdate}">
										</div>
									</td>
									<td>
										<div id="text-tools-replace-caption" class="text-tools-caption">
											заменить на:
										</div>
									</td>
									<td>
										<div id="text-tools-replace-input" class="text-tools-input">
											<input maxlength="20" size="10" type="text" value="{$nowdate}">
										</div>
									</td>
									<td>
										<div class="text-tools-button">
											<a id="text-link-replace" href="#replace">Заменить</a>
										</div>
									</td>
								</tr>
							</table>
					</div>
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
							<a 
								id="text-menu-{$key.name}" 
								class="text-links-menu text-links-menu-normal" 
								data-file="{$key.file}" 
								href="#text-{$key.name}"
							>
								{$key.caption}
							</a>
						{/foreach}
					{/if}
					</div>
				</td>
				<td>
					<div id="text-wrap">
						<textarea id="text-area" wrap="soft" width="100%">lorem ipsum dolor</textarea>
						<input id="text-input-file" type="hidden" value="main.html">
					</div>
				</td>
			</tr>
		</table>
	</div>	
</div>
