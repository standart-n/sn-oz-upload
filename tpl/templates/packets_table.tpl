		<table align="left" cellpadding="4" cellspacing="4" border="0">
			<tr valign="top">
				<td align="center">
					id
				</td>
				<td align="center">
					packet
				</td>
				<td align="center">
					actualdt
				</td>
				<td align="center">
					path
				</td>
				<td align="center">
					caption
				</td>
			</tr>
		{if isset($packets)}
			{foreach from=$packets item=key}
				<tr valign="top">
					<td align="right">
						{$key.id}
					</td>
					<td align="right">
						{$key.packet}
					</td>
					<td align="right">
						{$key.actualdt}
					</td>
					<td align="right">
						<a class="packets-link-download" href="{$key.content}">{$key.content}</a>
					</td>
					<td align="right">
						{$key.caption}
					</td>
				</tr>
			{/foreach}
		{/if}
		</table>		
