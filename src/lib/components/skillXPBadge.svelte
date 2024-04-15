<script lang="ts">
import { Skill, playerSkillData } from '../../stores/skillStore';
export let skill: string;
let skillInfo: Skill;
playerSkillData.subscribe((value) => {
    skillInfo = value.find(x => x.name === skill) || new Skill(0, '', 0);
});
</script>

<div class="stats shadow">
	<div class="stat">
	  <div class="stat-title">{skillInfo.name} Experience</div>
	  <div class="stat-value">{skillInfo.experience} / {Math.round(((Math.floor(0.07 * Math.sqrt(skillInfo.experience))+1)/0.07)**2)}</div>
	  <progress class="progress progress-info w-56" value="{skillInfo.experience}" max={Math.round(((Math.floor(0.07 * Math.sqrt(skillInfo.experience))+1)/0.07)**2)}></progress>
	</div>
</div>
