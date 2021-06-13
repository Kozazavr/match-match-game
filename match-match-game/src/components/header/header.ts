const headerHtml = `<header class="header">
   <div class="header__wrapper">
      <div class="logo">
           <div class="logo__part">
             <p class="logo__text">match</p>
           </div>
           <div class="logo__part logo__part_down">
             <p class="logo__text logo__text_down">match</p>
           </div>
         </div>
         <nav class="header__nav">
           <ul class="header__list">
             <li class="header__list-item">
               <a class="header__link header__link-about" href="#/">
                 <div class="header__list-about header__list-style">
                   <p class="header__list-symbol-question">?</p>
                 </div>
                 <p class="header__list-text">About Game</p>
               </a>
             </li>
             <li class="header__list-item">
               <a class="header__link header__link-score" href="#/best_score/">
                 <div class="header__list-score header__list-style"></div>
                 <p class="header__list-text">Best Score</p>
               </a>
             </li>
             <li class="header__list-item">
               <a class="header__link header__link-settings" href="#/settings/">
                 <div class="header__list-setting-background header__list-style">
                   <div class="header__list-setting header__list-style"></div>
                 </div>
                 <p class="header__list-text">Game Settings</p>
               </a>
             </li>
           </ul>
         </nav>
         <button class="header__button header__button_register" type="button">register new player</button>
         <button class="header__button header__button_start invisible" type="button">start game</button>
         <button class="header__button header__button_stop invisible" type="button">stop game</button>
         <button class="header__button header__button_continue invisible" type="button">start game</button>
       </div>
     </header>`;

export default headerHtml;
