import './settings.css';

const settings = `
    <div class="setting">
      <div class="game__cards">
        <h2 class="select-title">Game cards</h2>
        <select class="select-cards" name="select-cards">
          <option value="" disabled selected>select game cards type</option>
          <option value="spider">spider</option>
          <option value="dogs">dogs</option>
          <option value="kitty">kitty</option>
        </select>
      </div>
      <div class="game__cards">
        <h2 class="select-title">Difficulty</h2>
        <select class="select-difficultly" name="select-difficultly">
          <option value="" disabled selected>select game type</option>
          <option value="4">easy</option>
          <option value="6">middle</option>
          <option value="8">hard</option>
        </select>
      </div>
    </div>`;

export default settings;
