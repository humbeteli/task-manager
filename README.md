# Tabula — Tapşırıq Meneceri

Tabula — autentifikasiya, qlobal state idarəetməsi və mock API ilə CRUD əməliyyatlarını özündə birləşdirən React tətbiqidir. Ad latın dilindən götürülüb, qədim Roma dövründə qeydlərin yazıldığı mum lövhə (tabula) mənasını verir.

## Xüsusiyyətlər

- **Mock autentifikasiya** — login/logout, token-based session
- **Qorunan route-lar** — login olmayan istifadəçi avtomatik `/login`-ə yönləndirilir
- **Qlobal state idarəetməsi** — Context API + useReducer
- **Form validasiyası** — email və şifrə üçün manual validasiya
- **CRUD əməliyyatları** — mock API (json-server) ilə, optimistic UI və rollback dəstəyi ilə
- **Error Boundary** — komponent xətası bütün tətbiqi çökdürmür
- **Feature-based qovluq strukturu**
- **Responsiv dizayn**
- **Silmə təsdiqi modalı və bildiriş paneli**

## Texnologiyalar

- React
- React Router
- Context API + useReducer
- Vite
- json-server (mock API)

## Quraşdırma və işə salma

1. Repo-nu klonlayın:
```bash
git clone [https://github.com/humbeteli/task-manager]
cd task-manager
```

2. Asılılıqları quraşdırın:
```bash
npm install
```

**3. Mock API-ni işə salın** (ayrı bir terminalda, bu terminal açıq qalmalıdır):
```bash
npx json-server --watch db.json --port 3000
```

**4. Başqa bir terminalda tətbiqi işə salın:**
```bash
npm run dev
```

**5. Brauzerdə açılan linkə keçin** (adətən `http://localhost:5173`)

> Qeyd: Tətbiq default olaraq `http://localhost:3000/tasks`-a qoşulur. Əlavə konfiqurasiyaya ehtiyac yoxdur, sadəcə json-server-in 3000 portunda işə düşdüyündən əmin olun.

## test hesabı

email: test@gmail.com
password: 123456