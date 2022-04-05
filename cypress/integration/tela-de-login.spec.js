const { fetch: fetchMock } = require('../mocks/fetch');
const { tokenResponse: tokenResponseMock } = require('../mocks/token');

const FETCH_TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';

const BUTTON_SETTINGS_SELECTOR = '[data-testid="btn-settings"]';
const SETTINGS_TITLE_SELECTOR = '[data-testid="settings-title"]';

const PLAYER_NAME = 'Nome da pessoa';
const PLAYER_EMAIL = 'email@pessoa.com';

describe('1 - [TELA DE LOGIN] Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
  });

  it('Será validado se é possível escrever o nome da pessoa jogadora', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
  });

  it('Será validado se é possível escrever o email da pessoa jogadora', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
  });

  it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora não preencher nenhum campo', () => {
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora escrever apenas o nome', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora escrever apenas o email', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('Será validado se o botão "Play" está habilitado quando a pessoa jogadora preencher os campos de nome e email', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).should('not.be.disabled');
  });
});

describe('2 - [TELA DE LOGIN] Crie o botão de iniciar o jogo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
        cy.spy(win, 'fetch');
      },
    });
  });

  it('Será validado se ao clicar no botão "Play" o jogo é iniciado salvando um token de jogador', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();

    cy.window()
      .its('fetch')
      .should('be.calledWith', FETCH_TOKEN_URL);

    cy.window().its('store').invoke('getState').then((state) => {
      expect(state.token).to.equal(tokenResponseMock.token);
    });
  });
});

describe('3 - [TELA DE LOGIN] Crie um botão na tela inicial que leve para a tela de configurações', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
  });

  it('Será validado se o botão existe na página', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).should('exist');
  });

  it('Será validado se a tela de configurações possui um título', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).click();
    cy.get(SETTINGS_TITLE_SELECTOR).should('exist');
  });
});
