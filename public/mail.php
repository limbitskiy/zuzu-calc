<?php

$name = $_POST['name'];
echo $name;

// $colors = ['red', 'blue']

// print_r($colors)
// file_put_contents('output.txt', "$colors\n---\n", FILE_APPEND | LOCK_EX);

// $mailTo = 'gagarinbrood@gmail.com';

// $subject = 'Письмо с сайта zuzumaster.ru';

// $headers = 'Content-Type: text/plain; charset=utf-8';
// $name = $_POST['name'];
// $tel = $_POST['phoneNumber'];
// $date = date('d/m/Y');
// $time = date('H:i');

// $message = "Имя заказчика: $name\nТелефон: $tel\nДата заказа: $date\nВремя заказа: $time";

// $retval = mail($mailTo, $subject, $message, $headers);

// if ( $retval == true ) {
//     echo json_encode(array(
//        'success'=> true,
//        'message' => 'Message sent successfully'
//     ));
//  } else {
//     echo json_encode(array(
//        'error'=> true,
//        'message' => 'Error sending message'
//     ));
//  }

// file_put_contents('orders.txt', "$message\n---\n", FILE_APPEND | LOCK_EX);

?>
