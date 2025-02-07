import './App.css';
import ParamEditor from './components/ParamEditor.tsx';

const initialParams = [
  { id: 1, name: 'Цвет' },
  { id: 2, name: 'Форма' },
  { id: 3, name: 'Размер' },
];

const initialModel = {
  paramValues: [
    { paramId: 2, value: 'Шар' },
    { paramId: 3, value: 'Большой' },
    { paramId: 4, value: 'Хочу купить' },
  ],
};

function App() {
  return (
    <main>
      <h1>Редактор параметров</h1>
      <h2>Тестовое задание Selsup</h2>
      <p>
        Текст задания находится{' '}
        <a href="/Тестовое_задание_Frontend.pdf" rel="noreferrer">
          {' '}
          тут
        </a>
      </p>
      <article>
        <h3>Немного комментариев от себя</h3>
        <p>
          Не могу быть уверенным, что правильно понял описание задания. В
          частности, в описанных структурах есть свойства, природа которых
          неясна. Также не было ясно, всегда ли id и paramId совпадают. Поэтому
          реализация может быть не такой, как это предполагалось. Постарался
          учесть ситуацию, когда id в структурах не совпадают.
        </p>
      </article>
      <ParamEditor params={initialParams} model={initialModel} />
    </main>
  );
}

export default App;
