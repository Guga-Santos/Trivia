const { fetch: fetchMock } = require('../mocks/fetch');

const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const CORRECT_ALTERNATIVE_SELECTOR = '[data-testid="correct-answer"]';
const WRONG_ALTERNATIVES_SELECTOR = '[data-testid*="wrong-answer"]';

const BUTTON_NEXT_QUESTION_SELECTOR = '[data-testid="btn-next"]';

const name1 = 'Nome da pessoa';
const email1 = 'email@pessoa.com';

const name2 = 'Outra pessoa';
const email2 = 'outra@pessoa.com';

const name3 = 'Mais uma pessoa';
const email3 = 'mais@pessoa.com';

const BUTTON_RANKING_SELECTOR = '[data-testid="btn-ranking"]';
const RANKING_PLAYERS_NAME_SELECTOR = '[data-testid*="player-name"]';
const BUTTON_GO_HOME_SELECTOR = '[data-testid="btn-go-home"]';

describe('17 - [TELA DE RANKING] Crie um botão para ir ao início', () => {
  it('Será validado se ao clicar no botão a pessoa volta para a tela inicial', () => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name1);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email1);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).should('exist');
  
  });
});

describe('18 - [TELA DE RANKING] Crie o conteúdo da tela de _ranking_', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name1);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email1);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();
  });

  it('Será validado se existe uma pessoa no _ranking_', () => {
    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(1);
    });
  });

  it('Será validado se existem duas pessoas no _ranking_', () => {
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name2);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email2);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(2);
    });
  });

  it('Será validado se o _ranking_ é ordenado pela pontuação', () => {
    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name2);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email2);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    cy.get(BUTTON_GO_HOME_SELECTOR).click();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).clear();
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).clear();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name3);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email3);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(BUTTON_RANKING_SELECTOR).click();

    const ranking = [name1, name3, name2];

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).should(($el) => {
      expect($el).to.have.lengthOf(3);
    });

    cy.get(RANKING_PLAYERS_NAME_SELECTOR).each(($el, $index) => {
      expect($el.text()).to.be.eq(ranking[$index]);
    });
  });
});