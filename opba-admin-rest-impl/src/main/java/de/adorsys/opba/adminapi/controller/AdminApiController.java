package de.adorsys.opba.adminapi.controller;

import de.adorsys.opba.adminapi.model.generated.BankData;
import de.adorsys.opba.adminapi.model.generated.PageBankData;
import de.adorsys.opba.adminapi.resource.generated.AdminApiControllerApi;
import de.adorsys.opba.adminapi.service.AdminApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class AdminApiController implements AdminApiControllerApi {

    private final AdminApiService adminApiService;

    @Override
    public ResponseEntity<BankData> createNewBankDataEntry(UUID bankId, @Valid BankData body) {
        return ResponseEntity.ok(adminApiService.createOrReplaceBank(bankId, body));
    }

    @Override
    public ResponseEntity<BankData> deleteBankDataEntry(UUID bankId) {
        return null;
    }

    @Override
    public ResponseEntity<BankData> getBankDataById(@NotNull @Valid UUID bankId) {
        BankData data = adminApiService.getBankDataByBankId(bankId);
        if (null == data) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(data);
    }

    @Override
    public ResponseEntity<PageBankData> getBanksData(Integer page, Integer size) {
        return ResponseEntity.ok(adminApiService.getBankDatas(page, size));
    }

    @Override
    public ResponseEntity<BankData> updateBankDataEntry(UUID bankId, @Valid BankData body) {
        return null;
    }
}