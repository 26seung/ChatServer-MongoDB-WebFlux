package com6.chatapp.server;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<Chat,String> {
    // Flux : 흐름이다. 데이터가 단방향이 아닌 응답을 유지하면서 데이터를 계속 교류
    @Tailable       //  커서를 안닫고 계속 유지 하는 어노테이션
    @Query("{sender:?0,receiver:?1}")
    Flux<Chat>mFindBySender(String sender, String receiver);
}
