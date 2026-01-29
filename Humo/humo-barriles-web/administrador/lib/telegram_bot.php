<?php
define('TELEGRAM_BOT_TOKEN', '8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI');
define('TELEGRAM_CHAT_ID', '-4927137480');

class TelegramBot {
    private $botToken;

    public function __construct($botToken) {
        $this->botToken = $botToken;
    }

    public function sendMessage($chatId, $message) {
        $url = "https://api.telegram.org/bot{$this->botToken}/sendMessage";
        $data = [
            'chat_id' => $chatId,
            'text' => $message
        ];

        $options = [
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => http_build_query($data)
            ]
        ];

        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        return $result;
    }
}
?>
