const { MD5 } = require('crypto-js');
const { fetch: fetchMock } = require('../mocks/fetch');
const { questionsResponse } = require('../mocks/questions');

const FETCH_TOKEN_URL = "https://opentdb.com/api_token.php?command=request";
const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const HEADER_IMAGE_SELECTOR = '[data-testid="header-profile-picture"]';
const HEADER_NAME_SELECTOR = '[data-testid="header-player-name"]';
const HEADER_SCORE_SELECTOR = '[data-testid="header-score"]';
const QUESTION_CATEGORY_SELECTOR = '[data-testid="question-category"]';
const QUESTION_TEXT_SELECTOR = '[data-testid="question-text"]';
const CORRECT_ALTERNATIVE_SELECTOR = '[data-testid="correct-answer"]';
const WRONG_ALTERNATIVES_SELECTOR = '[data-testid*="wrong-answer"]';
const ALL_ALTERNATIVES_SELECTOR = '[data-testid="answer-options"]';
const BUTTON_NEXT_QUESTION_SELECTOR = '[data-testid="btn-next"]';
const FEEDBACK_TEXT_SELECTOR = '[data-testid="feedback-text"]';

const PLAYER_NAME = 'Nome da pessoa';
const PLAYER_EMAIL = 'email@pessoa.com';

describe('4 - [TELA DE JOGO] Crie um _header_ que deve conter as informações da pessoa jogadora', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_NAME_SELECTOR);
  });

  it('Será validado se a imagem do Gravatar está presente no header', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
    cy.get(HEADER_IMAGE_SELECTOR).should('have.attr', 'src', `https://www.gravatar.com/avatar/${MD5(PLAYER_EMAIL)}`);
  });

  it('Será validado se o nome da pessoa está presente no header', () => {
    cy.get(HEADER_NAME_SELECTOR).contains(PLAYER_NAME);
  });

  it('Será validado se o placar zerado está presente no header', () => {
    cy.get(HEADER_SCORE_SELECTOR).contains('0');
  });
});

describe('5 - [TELA DE JOGO] Crie a página de jogo que deve conter as informações relacionadas à pergunta', () => {
  const loadQuestionsPage = (spy = true, fetch = fetchMock) => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetch;
        spy && cy.spy(win, 'fetch');
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  }

  beforeEach(loadQuestionsPage);

  it('Será validado se a API de perguntas é chamada corretamente', () => {
    cy.window().then((win) => {
      expect(win.fetch).to.have.been.calledWith(FETCH_TOKEN_URL);
    });
  });

  it('Será validado se a categoria da pergunta está presente', () => {
    cy.get(QUESTION_CATEGORY_SELECTOR).should('exist');
    cy.get(QUESTION_CATEGORY_SELECTOR).contains(questionsResponse.results[0].category);
  });

  it('Será validado se o texto da pergunta está presente', () => {
    cy.get(QUESTION_TEXT_SELECTOR).should('exist');
    cy.get(QUESTION_TEXT_SELECTOR).contains(questionsResponse.results[0].question);
  });

  it('Será validado se as alternativas estão presentes', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('exist');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).contains(questionsResponse.results[0].correct_answer);
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('exist');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).each((element) => {
      expect(element.text()).to.includes.oneOf(questionsResponse.results[0].incorrect_answers);
    });
  });

  it('Será validado se as alternativas estão posicionadas em ordem aleatória', () => {
    const answersList = [];
    cy.get(ALL_ALTERNATIVES_SELECTOR).then(() => {
      for (let i = 0; i < 5; i+= 1) {
        loadQuestionsPage(false);
        cy.get(ALL_ALTERNATIVES_SELECTOR).then((newAnswersSection) => {
          const newAnswers = Array.from(newAnswersSection.children()).map((answer) => answer.dataset.testid);
          const currentIndex = newAnswers.indexOf('correct-answer');
          answersList.push(currentIndex);
          });
      };
    }).then(() => {
      const removeRepeatedList = [...new Set(answersList)];
      expect(removeRepeatedList.length).to.be.greaterThan(1);
    });
  });
});

describe('6 - [TELA DE JOGO] Desenvolva o jogo onde só deve ser possível escolher uma resposta correta por pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se a quantidade de alternativas corretas é 1', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.length', 1);
  });
});

describe('7 - [TELA DE JOGO] Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se a cor da alternativa correta é "rgb(6, 240, 15)" ao acertar a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-color', 'rgb(6, 240, 15)');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor das alternativas incorretas é "rgb(255, 0, 0)" ao acertar a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-color', 'rgb(255, 0, 0)');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor da alternativa correta é "rgb(6, 240, 15)" ao errar a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-color', 'rgb(6, 240, 15)');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border-width', '3px');
  });

  it('Será validado se a cor das alternativas incorretas é "rgb(255, 0, 0)" ao errar a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-color', 'rgb(255, 0, 0)');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-style', 'solid');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border-width', '3px');
  });
});

describe('8 - [TELA DE JOGO] Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('Será validado se é possível aguardar 5 segundos e responder a alternativa correta', () => {
    cy.wait(5000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('not.be.disabled').click();
  });

  it('Será validado se ao aguardar mais de 30 segundos para responder, todos botões estão desabilitados', () => {
    cy.wait(32000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('be.disabled');
  });
});

describe('9 - [TELA DE JOGO] Crie o placar com as seguintes características:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

   it('Será validado se os pontos são somados ao acertar uma questão', () => {
    let lastScore;
    cy.window().its('store').invoke('getState').then((state) => {
      lastScore = state.player.score;
    });
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      cy.window().its('store').invoke('getState').then((state) => {
        expect(lastScore).to.be.lt(state.player.score);
      });
    });
  });

  it('Será validado se os pontos não são somados ao errar uma questão', () => {
    let lastScore;
    cy.window().its('store').invoke('getState').then((state) => {
      lastScore = state.player.score;
    });
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      cy.window().its('store').invoke('getState').then((state) => {
        expect(lastScore).to.be.eq(state.player.score);
      });
    });
  });
});

describe('10 - [TELA DE JOGO] Crie um botão de "Next" que apareça após a resposta ser dada', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(QUESTION_TEXT_SELECTOR);
  });

  it('Será validado se o botão "Next" não é visível no início do jogo', () => {
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('not.be.visible');
  });

  it('Será validado se o botão "Next" é visível quando a pergunta é respondida corretamente', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });

  it('Será validado se o botão "Next" é visível quando a pergunta é respondida incorretamente', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });
});

describe('11 - [TELA DE JOGO] Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(PLAYER_NAME);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(PLAYER_EMAIL);
    cy.get(BUTTON_PLAY_SELECTOR).click();
    cy.get(HEADER_SCORE_SELECTOR);
  });

  it('Será validado se os pontos são somados de forma correta ao acertar todas as respostas', () => {
    let lastScore;
    cy.window().its('store').invoke('getState').then((state) => {
      lastScore = state.player.score;
    });
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      cy.window().its('store').invoke('getState').then((state) => {
        expect(lastScore).to.be.lt(state.player.score);
      });
    });
  });

  it('Será validado se os pontos são somados de forma correta ao errar todas as respostas', () => {
    let lastScore;
    cy.window().its('store').invoke('getState').then((state) => {
      lastScore = state.player.score;
    });
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      cy.window().its('store').invoke('getState').then((state) => {
        expect(lastScore).to.be.eq(state.player.score);
      });
    });
  });

  it('Será validado se a pessoa usuária é redirecionada para a tela de _feedback_ após a quinta pergunta', () => {
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
    cy.get(FEEDBACK_TEXT_SELECTOR).should('exist');
  });
});