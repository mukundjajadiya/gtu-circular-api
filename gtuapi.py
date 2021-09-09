from bs4 import BeautifulSoup
import requests


def get_result():
    url = 'https://www.gtu.ac.in/Circular.aspx'
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'}

    result = []

    response = requests.get(url, headers=headers).text

    html_document = response
    soup = BeautifulSoup(html_document, 'html.parser')

    for i in range(50):
        date = soup.findAll(
            'span', {'id': f'ContentPlaceHolder1_lvCircular_lblUploadDate_{i}'})[0].text

        content = soup.findAll(
            'span', {'id': f'ContentPlaceHolder1_lvCircular_lblContentHeading_{i}'})[0].text

        content_a = soup.findAll(
            'span', {'id': f'ContentPlaceHolder1_lvCircular_lblContentHeading_{i}'})[0].find('a')['href'].replace(" ", "%20")

        result.append({'id': f'{i}', 'date': f'{date}',
                      'content': f'{content}', 'link': f'{content_a}'})
    return result


