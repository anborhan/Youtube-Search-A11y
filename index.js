const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

const API_KEY = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=SEARCHPARAMATER&maxResults=25&key=";

function getDataFromApi(searchTerm, callback) {
  const query = {

    part: 'snippet',
    key: "AIzaSyDe_gH8CbdZSQn7ptEwyztoGyCNPQUC9fs",
    q: `${searchTerm} in:name`,
    per_page:5,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}

function renderResult(result) {
    return `
    <div>
      <h2>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}"  target="_blank">
        <img src="http://img.youtube.com/vi/${result.id.videoId}/default.jpg">
      </a>
      <a class="youtube-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> by <a class="youtube-user-name" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a>
      </h2>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.youtube-search-results').html(results);

}

function watchSubmit() {
  $('.youtube-search').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.youtube-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);

  });
}


$(watchSubmit);
