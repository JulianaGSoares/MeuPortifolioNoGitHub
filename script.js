// Nome de usuário do GitHub
const username = 'JulianaGSoares';

// URL da API do GitHub para buscar os repositórios
const apiUrl = `https://api.github.com/users/${username}/repos`;

// Seleciona o elemento onde os repositórios serão inseridos
const reposContainer = document.querySelector('.repos');

// Função para buscar os repositórios
async function fetchRepos() {
    try {
        const response = await fetch(apiUrl);
        const repos = await response.json();
        
        // Filtrar apenas repositórios que não são forks e ordenar por data de criação (antigos primeiro)
        const userRepos = repos
            .filter(repo => !repo.fork) // Exclui forks
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); // Ordena por data de criação (antigos primeiro)
        
        // Exibe os repositórios no HTML
        userRepos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repo');
            
            repoElement.innerHTML = `
                <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            `;
            
            reposContainer.appendChild(repoElement);
        });
    } catch (error) {
        console.error('Erro ao buscar os repositórios:', error);
    }
}

// Chama a função ao carregar a página
fetchRepos();
