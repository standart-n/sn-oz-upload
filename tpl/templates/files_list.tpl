		{if isset($files)}
			{foreach from=$files item=key}
				<div class="files-list-item">{$key.name}</div>
			{/foreach}
		{/if}
